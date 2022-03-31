import { useState } from "react"

interface FormDate {
  begin: string,
  final: string
}

const Graphic = () => {
  const [formDate, setFormDate] = useState<FormDate>({begin: '', final: ''})

  return (
    <>
      <div className="container-form-date">
        <input type="date" value={formDate.begin} onChange={(event) => setFormDate({...formDate, begin: event.target.value})}/>
        <input type="date" value={formDate.final} onChange={(event) => setFormDate({...formDate, final: event.target.value})}/>
      </div>
    </>
  )
}

export default Graphic