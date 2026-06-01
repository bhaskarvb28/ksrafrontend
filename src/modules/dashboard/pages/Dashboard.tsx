import {useDisciplines} from "@/modules/disciplines/hooks/useDiscipline"

export default function DashboardPage() {

  const disciplines = useDisciplines()

  console.log(disciplines)
  
  return (
    <div>
      Dashboard
    </div>
  )
}