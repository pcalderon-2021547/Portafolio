import SocialIcon from '../../ui/SocialIcon/SocialIcon';
import { socialLinks } from '../../../data/social';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.icons}>
        {Object.entries(socialLinks).map(([name, { url }]) => (
          <SocialIcon key={name} name={name} url={url} size="small" />
        ))}
      </div>
    </footer>
  );
}
