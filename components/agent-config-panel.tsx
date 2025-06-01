"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box,
  Switch,
  FormControlLabel,
  Alert,
  CircularProgress,
} from "@mui/material"
import { useFormik } from "formik"
import * as Yup from "yup"
import type { AgentConfig } from "@/types/agent"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { updateAgentConfig, selectAgentConfig, fetchAgentConfig } from "@/store/slices/agentConfigSlice"
import { enqueueSnackbar } from "notistack"

interface AgentConfigPanelProps {
  agentId: string
}

const AgentConfigPanel: React.FC<AgentConfigPanelProps> = ({ agentId }) => {
  const dispatch = useAppDispatch()
  const agentConfig = useAppSelector(selectAgentConfig)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadAgentConfig = async () => {
      setLoading(true)
      setError(null)
      try {
        await dispatch(fetchAgentConfig(agentId)).unwrap()
      } catch (e: any) {
        setError(e.message || "Failed to load agent configuration.")
      } finally {
        setLoading(false)
      }
    }

    loadAgentConfig()
  }, [dispatch, agentId])

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    model: Yup.string().required("Model is required"),
    temperature: Yup.number()
      .min(0, "Temperature must be at least 0")
      .max(1, "Temperature must be at most 1")
      .required("Temperature is required"),
    maxTokens: Yup.number()
      .integer("Max Tokens must be an integer")
      .positive("Max Tokens must be positive")
      .required("Max Tokens is required"),
    topP: Yup.number()
      .min(0, "Top P must be at least 0")
      .max(1, "Top P must be at most 1")
      .required("Top P is required"),
    frequencyPenalty: Yup.number()
      .min(-2, "Frequency Penalty must be at least -2")
      .max(2, "Frequency Penalty must be at most 2")
      .required("Frequency Penalty is required"),
    presencePenalty: Yup.number()
      .min(-2, "Presence Penalty must be at least -2")
      .max(2, "Presence Penalty must be at most 2")
      .required("Presence Penalty is required"),
    streaming: Yup.boolean().required("Streaming is required"),
  })

  const formik = useFormik({
    initialValues: {
      name: agentConfig?.name || "",
      model: agentConfig?.model || "gpt-3.5-turbo",
      temperature: agentConfig?.temperature || 0.7,
      maxTokens: agentConfig?.maxTokens || 2000,
      topP: agentConfig?.topP || 1,
      frequencyPenalty: agentConfig?.frequencyPenalty || 0,
      presencePenalty: agentConfig?.presencePenalty || 0,
      streaming: agentConfig?.streaming || false,
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await dispatch(updateAgentConfig({ agentId: agentId, config: values as AgentConfig })).unwrap()
        enqueueSnackbar("Agent configuration updated successfully!", { variant: "success" })
      } catch (error: any) {
        enqueueSnackbar(error.message || "Failed to update agent configuration.", { variant: "error" })
      }
    },
  })

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Agent Configuration</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={formik.touched.model && Boolean(formik.errors.model)}>
            <InputLabel id="model-label">Model</InputLabel>
            <Select
              labelId="model-label"
              id="model"
              name="model"
              value={formik.values.model}
              label="Model"
              onChange={formik.handleChange}
            >
              <MenuItem value="gpt-3.5-turbo">gpt-3.5-turbo</MenuItem>
              <MenuItem value="gpt-4">gpt-4</MenuItem>
            </Select>
            <FormHelperText>{formik.touched.model && formik.errors.model}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="temperature"
            name="temperature"
            label="Temperature"
            type="number"
            value={formik.values.temperature}
            onChange={formik.handleChange}
            error={formik.touched.temperature && Boolean(formik.errors.temperature)}
            helperText={formik.touched.temperature && formik.errors.temperature}
            inputProps={{
              step: 0.01,
              min: 0,
              max: 1,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="maxTokens"
            name="maxTokens"
            label="Max Tokens"
            type="number"
            value={formik.values.maxTokens}
            onChange={formik.handleChange}
            error={formik.touched.maxTokens && Boolean(formik.errors.maxTokens)}
            helperText={formik.touched.maxTokens && formik.errors.maxTokens}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="topP"
            name="topP"
            label="Top P"
            type="number"
            value={formik.values.topP}
            onChange={formik.handleChange}
            error={formik.touched.topP && Boolean(formik.errors.topP)}
            helperText={formik.touched.topP && formik.errors.topP}
            inputProps={{
              step: 0.01,
              min: 0,
              max: 1,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="frequencyPenalty"
            name="frequencyPenalty"
            label="Frequency Penalty"
            type="number"
            value={formik.values.frequencyPenalty}
            onChange={formik.handleChange}
            error={formik.touched.frequencyPenalty && Boolean(formik.errors.frequencyPenalty)}
            helperText={formik.touched.frequencyPenalty && formik.errors.frequencyPenalty}
            inputProps={{
              step: 0.01,
              min: -2,
              max: 2,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="presencePenalty"
            name="presencePenalty"
            label="Presence Penalty"
            type="number"
            value={formik.values.presencePenalty}
            onChange={formik.handleChange}
            error={formik.touched.presencePenalty && Boolean(formik.errors.presencePenalty)}
            helperText={formik.touched.presencePenalty && formik.errors.presencePenalty}
            inputProps={{
              step: 0.01,
              min: -2,
              max: 2,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Switch
                checked={formik.values.streaming}
                onChange={formik.handleChange}
                name="streaming"
                id="streaming"
              />
            }
            label="Streaming"
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Update Configuration
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default AgentConfigPanel
