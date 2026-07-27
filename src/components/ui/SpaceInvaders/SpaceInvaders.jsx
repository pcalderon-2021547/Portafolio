import { useRef, useEffect, useCallback } from 'react';
import { useTranslation } from '../../../context/LanguageContext';
import styles from './SpaceInvaders.module.css';

const COLS = 10;
const ROWS = 4;
const ENEMY_W = 28;
const ENEMY_H = 20;
const GAP = 8;
const PLAYER_W = 32;
const PLAYER_H = 14;
const BULLET_W = 3;
const BULLET_H = 10;

export default function SpaceInvaders({ onExit }) {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const { lang } = useTranslation();

  const startGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const W = canvas.width;
    const H = canvas.height;
    const isEs = lang === 'es';

    let player = { x: W / 2 - PLAYER_W / 2, y: H - 40 };
    let bullets = [];
    let enemies = [];
    let enemyDir = 1;
    let enemySpeed = 0.5;
    let score = 0;
    let lives = 3;
    let gameOver = false;
    let won = false;
    let keys = {};

    function initEnemies() {
      enemies = [];
      const totalW = COLS * (ENEMY_W + GAP) - GAP;
      const startX = (W - totalW) / 2;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          enemies.push({
            x: startX + c * (ENEMY_W + GAP),
            y: 30 + r * (ENEMY_H + GAP),
            w: ENEMY_W, h: ENEMY_H,
            alive: true,
          });
        }
      }
    }
    initEnemies();

    let lastShot = 0;
    const shotCooldown = 300;
    let animationFrame;

    function drawShip(x, y) {
      ctx.fillStyle = '#39ff14';
      ctx.beginPath();
      ctx.moveTo(x + PLAYER_W / 2, y);
      ctx.lineTo(x + PLAYER_W, y + PLAYER_H);
      ctx.lineTo(x, y + PLAYER_H);
      ctx.closePath();
      ctx.fill();
      ctx.shadowColor = '#39ff14';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    function drawEnemy(e, frame) {
      if (!e.alive) return;
      ctx.fillStyle = '#ff073a';
      ctx.shadowColor = '#ff073a';
      ctx.shadowBlur = 6;
      ctx.fillRect(e.x, e.y, e.w, e.h);
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#fff';
      ctx.fillRect(e.x + 5, e.y + 3, 4, 4);
      ctx.fillRect(e.x + e.w - 9, e.y + 3, 4, 4);
      if (frame % 30 < 15) {
        ctx.fillRect(e.x + 4, e.y + e.h - 6, 6, 3);
        ctx.fillRect(e.x + e.w - 10, e.y + e.h - 6, 6, 3);
      }
    }

    function drawBullet(b) {
      ctx.fillStyle = '#fff';
      ctx.shadowColor = '#fff';
      ctx.shadowBlur = 6;
      ctx.fillRect(b.x, b.y, BULLET_W, BULLET_H);
      ctx.shadowBlur = 0;
    }

    let frame = 0;

    function update() {
      if (gameOver || won) return;
      frame++;

      if (keys['ArrowLeft'] && player.x > 0) player.x -= 3;
      if (keys['ArrowRight'] && player.x < W - PLAYER_W) player.x += 3;
      if (keys[' '] && Date.now() - lastShot > shotCooldown) {
        bullets.push({ x: player.x + PLAYER_W / 2 - BULLET_W / 2, y: player.y - BULLET_H });
        lastShot = Date.now();
      }

      bullets = bullets.filter(b => b.y > 0);
      bullets.forEach(b => { b.y -= 5; });

      const alive = enemies.filter(e => e.alive);
      if (alive.length === 0) { won = true; return; }

      let hitEdge = false;
      alive.forEach(e => {
        e.x += enemyDir * enemySpeed;
        if (e.x <= 0 || e.x + e.w >= W) hitEdge = true;
      });
      if (hitEdge) {
        enemyDir *= -1;
        alive.forEach(e => { e.y += 6; });
        enemySpeed += 0.02;
      }

      bullets.forEach(b => {
        alive.forEach(e => {
          if (e.alive && b.x < e.x + e.w && b.x + BULLET_W > e.x && b.y < e.y + e.h && b.y + BULLET_H > e.y) {
            e.alive = false;
            b.y = -10;
            score += 10;
          }
        });
      });

      alive.forEach(e => {
        if (e.y + e.h >= player.y) {
          gameOver = true;
        }
      });
    }

    function draw() {
      ctx.fillStyle = '#0d0d0d';
      ctx.fillRect(0, 0, W, H);

      drawShip(player.x, player.y);
      enemies.forEach(e => drawEnemy(e, frame));
      bullets.forEach(drawBullet);

      ctx.fillStyle = '#39ff14';
      ctx.font = '12px "Fira Code", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(isEs ? `Puntaje: ${score}` : `Score: ${score}`, 10, 18);
      ctx.textAlign = 'right';
      ctx.fillText(isEs ? `Vidas: ${'♥'.repeat(lives)}` : `Lives: ${'♥'.repeat(lives)}`, W - 10, 18);

      if (gameOver) {
        ctx.fillStyle = '#ff073a';
        ctx.font = 'bold 20px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.shadowColor = '#ff073a';
        ctx.shadowBlur = 12;
        ctx.fillText(isEs ? 'GAME OVER' : 'GAME OVER', W / 2, H / 2 - 10);
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#888';
        ctx.font = '12px "Fira Code", monospace';
        ctx.fillText(isEs ? `Puntaje final: ${score}` : `Final score: ${score}`, W / 2, H / 2 + 20);
        ctx.fillText(isEs ? 'Presiona ESC para salir' : 'Press ESC to exit', W / 2, H / 2 + 40);
      }

      if (won) {
        ctx.fillStyle = '#39ff14';
        ctx.font = 'bold 20px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.shadowColor = '#39ff14';
        ctx.shadowBlur = 12;
        ctx.fillText(isEs ? '¡VICTORIA!' : 'VICTORY!', W / 2, H / 2 - 10);
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#888';
        ctx.font = '12px "Fira Code", monospace';
        ctx.fillText(isEs ? `Puntaje final: ${score}` : `Final score: ${score}`, W / 2, H / 2 + 20);
        ctx.fillText(isEs ? 'Presiona ESC para salir' : 'Press ESC to exit', W / 2, H / 2 + 40);
      }

      ctx.fillStyle = '#333';
      ctx.font = '10px "Fira Code", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(
        isEs ? '← → mover | SPACE disparar | ESC salir' : '← → move | SPACE shoot | ESC exit',
        W / 2, H - 8
      );
    }

    function loop() {
      update();
      draw();
      animationFrame = requestAnimationFrame(loop);
    }
    loop();

    function onKeyDown(e) {
      keys[e.key] = true;
      if (e.key === 'Escape' && (gameOver || won || true)) {
        cancelAnimationFrame(animationFrame);
        onExit?.();
      }
      if (e.key === ' ' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Escape') {
        e.preventDefault();
      }
    }

    function onKeyUp(e) {
      keys[e.key] = false;
    }

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    gameRef.current = { cancel: () => { cancelAnimationFrame(animationFrame); } };

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [onExit, lang]);

  useEffect(() => {
    const cleanup = startGame();
    return () => {
      cleanup?.();
      gameRef.current?.cancel();
    };
  }, [startGame]);

  return (
    <div className={styles.gameContainer}>
      <canvas ref={canvasRef} width={640} height={360} className={styles.canvas} />
    </div>
  );
}
