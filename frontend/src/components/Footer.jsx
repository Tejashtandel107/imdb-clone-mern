import { Box, Container, Typography, Link, Grid, Divider } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 4,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <MovieIcon sx={{ mr: 1, fontSize: 30 }} />
              <Typography variant="h6" fontWeight="bold">
                Movie App
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
              Your ultimate destination for discovering and managing movies.
              Browse, search, and enjoy a vast collection of films.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="/home" color="inherit" underline="hover">
                Home
              </Link>
              <Link href="/search" color="inherit" underline="hover">
                Search Movies
              </Link>
              <Link
                href="https://github.com"
                color="inherit"
                underline="hover"
                target="_blank"
              >
                About Us
              </Link>
              <Link
                href="https://github.com"
                color="inherit"
                underline="hover"
                target="_blank"
              >
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Social Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Connect With Us
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                sx={{
                  "&:hover": {
                    opacity: 0.7,
                  },
                }}
              >
                <GitHubIcon />
              </Link>
              <Link
                href="https://linkedin.com/in/tejash-tandel-57345b247"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                sx={{
                  "&:hover": {
                    opacity: 0.7,
                  },
                }}
              >
                <LinkedInIcon />
              </Link>
              <Link
                href="mailto:tejashtandel734@gmail.com"
                color="inherit"
                sx={{
                  "&:hover": {
                    opacity: 0.7,
                  },
                }}
              >
                <EmailIcon />
              </Link>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Email: tejashtandel734@gmail.com
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, bgcolor: "rgba(255, 255, 255, 0.2)" }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            © {currentYear} Movie App. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Link href="#" color="inherit" underline="hover" variant="body2">
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" underline="hover" variant="body2">
              Terms of Service
            </Link>
            <Link href="#" color="inherit" underline="hover" variant="body2">
              Cookies
            </Link>
          </Box>
        </Box>

        {/* Tech Stack Credit */}
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            Built with ❤️ using MERN Stack (MongoDB, Express.js, React.js,
            Node.js)
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
