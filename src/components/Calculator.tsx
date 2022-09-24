import { useState } from "react"
import styles from "../styles/Calculator.module.scss"
import classNames from "classnames/bind"
import { Historic } from "./Historic"
import { ClockCounterClockwise, Backspace } from "phosphor-react"

export function Calculator() {
  const [data, setData] = useState("")
  const buttonsChars = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, "."]
  const [operations, setOperations] = useState([""])
  const [showHistoric, setShowHistoric] = useState(false)
  let cx = classNames.bind(styles)

  function calculate() {
    
    setOperations([...operations, `${data} = ${eval(data)}`])

    setData(
      String(eval(data)).length > 3 && String(eval(data)).includes(".")
      ? String(eval(data).toFixed(2))
      : String(eval(data))
    )
  
  }

  function clearHistoric() {
    setOperations([""])
  }

  function handleShowHistoric() {
    setShowHistoric(!showHistoric)
  }

  function handleOperator(e: React.MouseEvent<Element, MouseEvent>) {
    if ((!data.includes("+")) && (!data.includes("-")) && !data.includes("*") && !data.includes("/")) {
      setData(data + ((e.target as HTMLTextAreaElement).value))
    }
  }
  
  return (
    <div className={styles.mainContainer}>
      <div className={styles.historicContainer}>
        <button 
          className={styles.btnHistoric}
          onClick={handleShowHistoric}
          title="Histórico"
        >
          <ClockCounterClockwise size={32} />
        </button>
      </div>
      
      {/* Historic Modal */}
      {showHistoric 
        && <Historic
              sendOperations={operations}
              clearHistoric={clearHistoric} 
            />
      }
      
      <div className={styles.calculator}>
        <div className={styles.display}>         
          <input className={styles.displayHistoric} 
              readOnly
              value={operations[operations.length - 1]}
          />  
          <input className={styles.displayOperations}
            readOnly
            value={!data ? "0" : data}
          />
        </div>     
        <button 
          className={styles.ac}
          onClick={() => {setData("")}}
        >
          AC
        </button>
        <button 
          className={styles.clear}
          onClick={() => {setData(data.substring(0, data.length - 1))}}
        >
          <Backspace size={20} />
        </button>
        <div className={styles.numbers}>
          {buttonsChars.map(item => {
            return (
              <button 
                className={cx([`btn-${item}`])}
                onClick={(e) => setData(data + ((e.target as HTMLTextAreaElement).value))}
                value={item}
                key={item}
              >
                {item}
              </button>
            )
          })}
          
        </div>
        <button 
          className={styles.operator}
          onClick={(e) => handleOperator(e)}
          value="/"
        >
          ÷
        </button>
        <button 
          className={styles.operator}
          onClick={(e) => handleOperator(e)}
          value="*"
        >
          x
        </button>
        <button 
          className={styles.operator}
          onClick={(e) => handleOperator(e)}
          value="-"
        >
          -
        </button>
        <button 
          className={styles.operator}
          onClick={(e) => handleOperator(e)}
          value="+"
        >
          +
        </button>
        <button 
          className={styles.btnEquals}
          onClick={calculate}
        >
          =
        </button>
      </div>
        
    </div>
  )
}
