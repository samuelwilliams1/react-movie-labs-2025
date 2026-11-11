import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { getTVVideos } from "../../api/tmdb-api";

const TVTrailer = ({ show}) => {
  const [open, setOpen] = useState(false);

  const {
    data: videos = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["tvVideos", String(show.id)],
    queryFn: () => getTVVideos(show.id),
    enabled: Boolean(show.id),
  });

  const trailers = videos.filter(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );

  const trailer =
    trailers.find((video) => video.official) || trailers[0];

  if (isPending) {
    return (
      <Typography sx={{ color: "white", my: 2 }}>
        Loading trailer...
      </Typography>
    );
  }

  if (isError) {
    return (
      <Typography role="alert" sx={{ color: "white", my: 2 }}>
        {error.message}
      </Typography>
    );
  }

  if (!trailer) {
    return (
      <Typography sx={{ color: "white", my: 2 }}>
        No trailer available.
      </Typography>
    );
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<PlayArrowIcon />}
        onClick={() => setOpen(true)}
        sx={{ my: 2 }}
      >
        Watch Trailer
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
        aria-labelledby="tv-trailer-title"
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#2d2f2f",
            color: "white",
          },
        }}
      >
        <DialogTitle
          id="tv-trailer-title"
          sx={{ fontWeight: 700 }}
        >
          {show.name} — Trailer
        </DialogTitle>

        <DialogContent>
          {open && (
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={`${show.name} trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                width: "100%",
                aspectRatio: "16 / 9",
                border: 0,
                display: "block",
              }}
            />
          )}
        </DialogContent>

        <DialogActions>
          <Button
            component="a"
            href={`https://www.youtube.com/watch?v=${trailer.key}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "white" }}
          >
            Open on YouTube
          </Button>

          <Button
            onClick={() => setOpen(false)}
            sx={{ color: "white" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TVTrailer;