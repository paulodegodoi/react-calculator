import { useState } from "react"
import styles from "../styles/Historic.module.scss"
import { Trash } from "phosphor-react"

interface sendOperationsProps {
  sendOperations: string[]
  clearHistoric: () => void
}

export function Historic({ sendOperations, clearHistoric }: sendOperationsProps) {

  const operations = Array.from(sendOperations).reverse()

  return (
    <div className={styles.container}>
      <button 
        onClick={clearHistoric}
        title="Limpar histórico"
      >
        <Trash size={32} />
      </button>
      <div>
        {operations[0] != "" ? operations.map(item => {
          return (
            <p key={item}>{item}</p>
          )
        })
        : <p>Histórico vazio.</p>
        }
      </div>
    </div>
  )
}