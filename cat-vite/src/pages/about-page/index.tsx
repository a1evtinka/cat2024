import { Row } from "antd"
import Card from "antd/es/card/Card"
import Meta from "antd/es/card/Meta"

export default function AboutPage() {
    const rules = [
        {id: 1, text: "Улыбайтесь", type: "cyan"},
        {id: 2, text: "Будьте самостоятельными", type: "cyan"},
        {id: 3, text: "Заранее предупредите если вы веган", type: "cyan"},
        {id: 4, text: "Не будьте душными", type: "cyan"},
        {id: 5, text: "Не переживайте", type: "cyan"},
        {id: 6, text: "Будьте открытыми", type: "cyan"},
        {id: 7, text: "Возьмите ноут и зарядку", type: "cyan"},
        {id: 8, text: "Не обижайтесь", type: "cyan"},
        {id: 9, text: "Проявляйте инициативу", type: "cyan"},
    ]

  return (
    <Row justify="center">
    {rules.map(rule => (
        <Card 
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
          <Meta title={rule.text} description="www.instagram.com" />
        </Card>
    ))}
 </Row>
  )
}


