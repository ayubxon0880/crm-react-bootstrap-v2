import {PieChart, Pie, Tooltip} from "recharts";


const Statistics = () => {
    const data = [
        {name:"Facebook", value: 2000000},
        {name:"Instagram", value: 2300000},
        {name:"Twiter", value: 1400000},
        {name:"Telegram", value: 5000000}
    ]

    return (
        <>
            <h1>Statistics</h1>
            <PieChart width={400} height={400}>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data}
                    cx="200"
                    cy="200"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                />
                <Tooltip />
            </PieChart>
        </>
    )
}

export default Statistics;