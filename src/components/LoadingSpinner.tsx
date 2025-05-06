import { Box, CircularProgress, Typography } from "@mui/material";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Завантаження...",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: 2,
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <CircularProgress size={60} />
      </motion.div>
      <Typography variant="h6" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};
