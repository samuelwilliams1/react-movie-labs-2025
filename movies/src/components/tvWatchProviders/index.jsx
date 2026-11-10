import { useQuery } from "@tanstack/react-query";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { getTVWatchProviders } from "../../api/tmdb-api";
const chip = { margin: 0.5 };

export default function TVWatchProviders({ show }) {
const {
  data: providerResults,
  isPending: providersLoading,
  error: providerError,
} = useQuery({
  queryKey: ["tvWatchProviders", { id: String(show.id) }],
  queryFn: () => getTVWatchProviders(show.id),
  enabled: Boolean(show.id),
});

const providers = providerResults?.IE ?? null;
const providersError = providerError?.message || "";

return (
    <Paper sx={{ padding: 2, marginTop: 2 }}>
        <Typography variant="h5" component="h3">
            Where to Watch - Ireland
        </Typography>

        {providersLoading ? (
            <Typography>Loading watch providers...</Typography>
        ) : providersError ? (
            <Typography role="alert">{providersError}</Typography>
        ) : (
            <>
                {[
                    ["flatrate", "Subscription"],
                    ["rent", "Rent"],
                    ["buy", "Buy"],
                    ["free", "Free"],
                    ["ads", "With ads"],
                ].map(([type, label]) =>
                    providers?.[type]?.length > 0 ? (
                        <div key={type}>
                            <Typography variant="subtitle1">{label}</Typography>
                            {providers[type].map(provider => (
                                <Chip
                                    key={provider.provider_id}
                                    label={provider.provider_name}
                                    sx={chip}
                                />
                            ))}
                        </div>
                    ) : null
                )}

                {! ["flatrate", "rent", "buy", "free", "ads"].some(
                    type => providers?.[type]?.length > 0
                ) && (
                    <Typography>
                        No watch availability listed for Ireland.
                    </Typography>
                )}

                {providers?.link && (
                    <Typography sx={{ marginTop: 1 }}>
                        <a
                            href={providers.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View watch options on TMDB
                        </a>
                    </Typography>
                )}
            </>
        )}

        <Typography variant="caption" display="block" sx={{ marginTop: 1 }}>
            Watch availability provided by JustWatch.
        </Typography>
    </Paper>
);
}

