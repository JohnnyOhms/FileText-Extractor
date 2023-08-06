import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: 0,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Load() {
  return (
    <div style={{ height: "100vh" }}>
      <Card
        sx={{
          width: { xs: "100vw", height: "100%", sm: "95vw", md: "95vw" },
          m: "20px auto",
        }}
      >
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          }
          title={
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />
        <Skeleton
          sx={{ height: 190, marginBottom: "10px" }}
          animation="wave"
          variant="rectangular"
        />
        <CardContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={8}>
                <Item>
                  {" "}
                  <Skeleton
                    variant="rectangular"
                    height="30px"
                    animation="wave"
                  />
                </Item>
              </Grid>
              <Grid item xs={6} md={4}>
                <Item>
                  {" "}
                  <Skeleton
                    variant="rectangular"
                    height="30px"
                    animation="wave"
                  />
                </Item>
              </Grid>
              <Grid item xs={6} md={4}>
                <Item>
                  <Skeleton
                    variant="rectangular"
                    height="30px"
                    animation="wave"
                  />
                </Item>
              </Grid>
              <Grid item xs={6} md={8}>
                <Item>
                  {" "}
                  <Skeleton
                    variant="rectangular"
                    height="30px"
                    animation="wave"
                  />
                </Item>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <CardContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={8}>
                <Item>
                  {" "}
                  <Skeleton
                    variant="rectangular"
                    height="30px"
                    animation="wave"
                  />
                </Item>
              </Grid>
              <Grid item xs={6} md={4}>
                <Item>
                  {" "}
                  <Skeleton
                    variant="rectangular"
                    height="30px"
                    animation="wave"
                  />
                </Item>
              </Grid>
              <Grid item xs={6} md={4}>
                <Item>
                  <Skeleton
                    variant="rectangular"
                    height="30px"
                    animation="wave"
                  />
                </Item>
              </Grid>
              <Grid item xs={6} md={8}>
                <Item>
                  {" "}
                  <Skeleton
                    variant="rectangular"
                    height="30px"
                    animation="wave"
                  />
                </Item>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <CardContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={8}>
                <Item>
                  {" "}
                  <Skeleton
                    variant="rectangular"
                    height="30px"
                    animation="wave"
                  />
                </Item>
              </Grid>
              <Grid item xs={6} md={4}>
                <Item>
                  {" "}
                  <Skeleton
                    variant="rectangular"
                    height="30px"
                    animation="wave"
                  />
                </Item>
              </Grid>
              <Grid item xs={6} md={4}>
                <Item>
                  <Skeleton
                    variant="rectangular"
                    height="30px"
                    animation="wave"
                  />
                </Item>
              </Grid>
              <Grid item xs={6} md={8}>
                <Item>
                  {" "}
                  <Skeleton
                    variant="rectangular"
                    height="30px"
                    animation="wave"
                  />
                </Item>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export function Loading() {
  return (
    <div>
      <Load loading />
    </div>
  );
}
