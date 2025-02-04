import { useState } from "react";
import "./App.css";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  Grid,
  Fade,
  IconButton,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import {
  ContentCopy,
  Palette,
  Email,
  AutoAwesome,
  Translate,
} from "@mui/icons-material";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/emailgenerator/generate",
        {
          emailContent,
          tone,
        }
      );
      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (error) {
      setError("Failed to generate email reply. Please try again");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
  maxWidth="xl"
  sx={{
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #0a1929 0%, #1a1a2e 50%, #16213e 100%)",
    py: 8,
    position: "fixed",  // Set the position to 'fixed'
    top: 0,  // Ensure it starts at the top of the screen
    left: 0,  // Ensure it starts at the left side of the screen
    width: "100%",  // Make the container span the full width of the viewport
    height: "100vh",  // Set the container height to the full height of the viewport
    overflow: "hidden",
    zIndex: 1,  // Make sure the container stays on top of other content
    "&:before": {
      content: '""',
      position: "absolute",
      width: "600px",
      height: "600px",
      background:
        "radial-gradient(circle, rgba(255,111,0,0.15) 0%, transparent 70%)",
      top: "-50px",
      right: "-150px",
    },
  }}
>
      <Fade in={true} timeout={800}>
        <Paper
          elevation={24}
          sx={{
            p: 6,
            borderRadius: 6,
            backdropFilter: "blur(16px)",
            background: "rgba(16, 18, 37, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            mx: "auto",
            maxWidth: "1400px",
            position: "relative",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              mb: 6,
              position: "relative",
              "&:after": {
                content: '""',
                position: "absolute",
                bottom: -20,
                left: "50%",
                transform: "translateX(-50%)",
                width: "60%",
                height: "2px",
                background:
                  "linear-gradient(to right, transparent, #FF6F00, transparent)",
              },
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 800,
                background:
                  "linear-gradient(45deg, #FF6F00 30%, #FFAB40 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <AutoAwesome sx={{ fontSize: 48 }} />
              Email AI Assistant
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "rgba(255,255,255,0.8)", mt: 1 }}
            >
              Craft perfect responses with AI-powered suggestions
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                rows={10}
                variant="outlined"
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Email sx={{ fontSize: 20 }} />
                    Original Email Content
                  </Box>
                }
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "#fff",
                    borderRadius: 3,
                    border: "1px solid rgba(255,255,255,0.2)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "#FF6F00",
                    },
                    "&.Mui-focused": {
                      borderColor: "#FF6F00",
                      boxShadow: "0 0 0 3px rgba(255, 111, 0, 0.2)",
                    },
                  },
                }}
                InputLabelProps={{
                  style: { color: "rgba(255,255,255,0.7)" },
                }}
              />

              <FormControl
                fullWidth
                sx={{
                  mt: 4,
                  "& .MuiOutlinedInput-root": {
                    color: "#fff",
                    borderRadius: 3,
                    border: "1px solid rgba(255,255,255,0.2)",
                  },
                }}
              >
                <InputLabel
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Palette sx={{ fontSize: 20 }} />
                  Tone (Optional)
                </InputLabel>
                <Select
                  value={tone}
                  label="Tone (Optional)"
                  onChange={(e) => setTone(e.target.value)}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        background: "#1a1a2e",
                        color: "#fff",
                        borderRadius: 3,
                        border: "1px solid rgba(255,255,255,0.2)",
                      },
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="professional">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Translate />
                      Professional
                    </Box>
                  </MenuItem>
                  <MenuItem value="casual">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <span>😎</span>
                      Casual
                    </Box>
                  </MenuItem>
                  <MenuItem value="friendly">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <span>😊</span>
                      Friendly
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!emailContent || loading}
                fullWidth
                sx={{
                  mt: 4,
                  py: 2,
                  borderRadius: 3,
                  background:
                    "linear-gradient(45deg, #FF6F00 0%, #FFAB40 100%)",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 24px rgba(255, 111, 0, 0.4)",
                  },
                  "&:disabled": {
                    background: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={28} sx={{ color: "#fff" }} />
                ) : (
                  "Generate Smart Reply"
                )}
              </Button>

              {error && (
                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    background: "rgba(255, 50, 50, 0.15)",
                    borderRadius: 3,
                    border: "1px solid rgba(255, 50, 50, 0.3)",
                  }}
                >
                  <Typography color="error" sx={{ textAlign: "center" }}>
                    ⚠️ {error}
                  </Typography>
                </Box>
              )}
            </Grid>

            {generatedReply && (
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    position: "relative",
                    height: "45%",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: 3,
                    p: 3,
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "#FFAB40",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <AutoAwesome sx={{ fontSize: 28 }} />
                      Generated Reply
                    </Typography>
                    <Tooltip title="Copy Reply" arrow>
                      <IconButton
                        onClick={() =>
                          navigator.clipboard.writeText(generatedReply)
                        }
                        sx={{
                          color: "#FFAB40",
                          "&:hover": {
                            background: "rgba(255, 171, 64, 0.1)",
                          },
                        }}
                      >
                        <ContentCopy />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Box
                    sx={{
                      height: "calc(100% - 100px)",
                      overflowY: "auto",
                      pr: 2,
                      "&::-webkit-scrollbar": {
                        width: "6px",
                      },
                      "&::-webkit-scrollbar-track": {
                        background: "rgba(255,255,255,0.05)",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "#FF6F00",
                        borderRadius: 3,
                      },
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        whiteSpace: "pre-wrap",
                        lineHeight: 1.6,
                        color: "rgba(255,255,255,0.9)",
                      }}
                    >
                      {generatedReply}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Fade>
    </Container>
  );
}

export default App;