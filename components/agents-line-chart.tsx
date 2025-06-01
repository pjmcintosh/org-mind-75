"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  {
    time: "00:00",
    Bob: 120,
    Ada: 180,
    Max: 80,
    Eve: 140,
  },
  {
    time: "04:00",
    Bob: 150,
    Ada: 220,
    Max: 95,
    Eve: 160,
  },
  {
    time: "08:00",
    Bob: 200,
    Ada: 280,
    Max: 120,
    Eve: 190,
  },
  {
    time: "12:00",
    Bob: 180,
    Ada: 250,
    Max: 110,
    Eve: 170,
  },
  {
    time: "16:00",
    Bob: 220,
    Ada: 300,
    Max: 140,
    Eve: 200,
  },
  {
    time: "20:00",
    Bob: 190,
    Ada: 270,
    Max: 125,
    Eve: 180,
  },
]

export const AgentsLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Bob" stroke="#8884d8" strokeWidth={2} />
        <Line type="monotone" dataKey="Ada" stroke="#82ca9d" strokeWidth={2} />
        <Line type="monotone" dataKey="Max" stroke="#ffc658" strokeWidth={2} />
        <Line type="monotone" dataKey="Eve" stroke="#ff7300" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default AgentsLineChart
