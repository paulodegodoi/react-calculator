import styles from "../styles/Footer.module.scss"

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Powered by <a target="_blank" href="https://github.com/paulodegodoi">@Paulo Godoi</a></p>
    </footer>
  )
}