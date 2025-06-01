"use client"

import type React from "react"
import { Card, CardContent, Typography, Grid, TextField, Button } from "@mui/material"

interface AgentConfigCardProps {
  agentName: string
  onAgentNameChange: (newName: string) => void
  onSave: () => void
}

const AgentConfigCard: React.FC<AgentConfigCardProps> = ({ agentName, onAgentNameChange, onSave }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          Agent Configuration
        </Typography>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Agent Name"
              value={agentName}
              onChange={(e) => onAgentNameChange(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={onSave}>
              Save Configuration
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AgentConfigCard
