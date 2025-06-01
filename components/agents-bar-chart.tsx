"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  {
    name: "Bob",
    tokens: 1250,
    requests: 45,
  },
  {
    name: "Ada",
    tokens: 2100,
    requests: 32,
  },
  {
    name: "Max",
    tokens: 850,
    requests: 18,
  },
  {
    name: "Eve",
    tokens: 1680,
    requests: 28,
  },
]

export const AgentsBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="tokens" fill="#8884d8" name="Tokens Used" />
        <Bar dataKey="requests" fill="#82ca9d" name="Requests" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default AgentsBarChart
