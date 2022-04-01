import { useContext, useState } from "react";
// import AnyChart from '../../node_modules/'
import { AppContext } from "../service/AppContext";
import { LineChart } from "recharts";

interface FormDate {
  begin: string,
  final: string
}

const Graphic = () => {
  const { provinces, stations } = useContext(AppContext);

  const [formDate, setFormDate] = useState<FormDate>({begin: '', final: ''});
  // const [stage, setStage] = useState()

  // useEffect(() => {
  //   setStage(anychart.graphics.create())
  // }, [])
  

  return (
    <>
      <div className="container-form-date">
        <input type="date" value={formDate.begin} onChange={(event) => setFormDate({...formDate, begin: event.target.value})}/>
        <input type="date" value={formDate.final} onChange={(event) => setFormDate({...formDate, final: event.target.value})}/>
      </div>
      <LineChart />
    </>
  )
}

export default Graphic;