import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import BookmarkRemoveRoundedIcon from "@mui/icons-material/BookmarkRemoveRounded";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import { yellow, blue, grey } from "@mui/material/colors";
import { Grid, Typography } from "@mui/material";
import getAxios from "../../api";
import styled from "styled-components";

function DetailMain(props) {
  const [likeBtn, setLikeBtn] = useState(false);
  const [checkBtn, setCheckBtn] = useState(false);
  const welfareId = Number(props.welfareId);
  const Name = props.Name;
  const Content = props.Content;
  const likeNum = props.likeNum;
  const usedNum = props.usedNum;
  const axios = getAxios();

  const likeAxios = () => {
    axios
      .put(`/api/users/like/${welfareId}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const unlikeAxios = () => {
    axios
      .delete(`/api/users/like/${welfareId}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const usedAxios = () => {
    axios
      .put(`/api/users/used/${welfareId}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const unusedAxios = () => {
    axios
      .delete(`/api/users/used/${welfareId}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    // console.log(likeNum);
    // console.log(usedNum);
    if (likeNum.length !== 0) {
      likeNum.includes(welfareId) ? setLikeBtn(true) : setLikeBtn(false);
    }
    if (usedNum.length !== 0) {
      usedNum.includes(welfareId) ? setCheckBtn(true) : setCheckBtn(false);
    }
  }, []);

  return (
    <Box
      sx={{
        "& > :not(style)": {
          m: 1,
          width: 1000,
          height: 200,
        },
        mb: 3,
        mt: 3,
      }}
    >
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container>
          <Grid item xs={10}>
            {/* <Typography variant="h4" align="left">
              {Name}
            </Typography> */}
            <h2>{Name}</h2>
          </Grid>
          <Grid item xs={2} align="right">
            <div>
              {likeBtn ? (
                <StarRoundedIcon
                  sx={{ color: yellow[600], fontSize: 40 }}
                  onClick={() => {
                    setLikeBtn(false);
                    unlikeAxios();
                  }}
                />
              ) : (
                <StarBorderRoundedIcon
                  sx={{ color: grey[400], fontSize: 40 }}
                  onClick={() => {
                    setLikeBtn(true);
                    likeAxios();
                  }}
                />
              )}
              {checkBtn ? (
                <BookmarkRemoveRoundedIcon
                  sx={{ color: blue[600], fontSize: 35 }}
                  onClick={() => {
                    setCheckBtn(false);
                    unusedAxios();
                  }}
                />
              ) : (
                <BookmarkAddedOutlinedIcon
                  sx={{ color: grey[400], fontSize: 35 }}
                  onClick={() => {
                    setCheckBtn(true);
                    usedAxios();
                  }}
                />
              )}
            </div>
          </Grid>
        </Grid>
        <StyledP>{Content}</StyledP>
      </Paper>
    </Box>
  );
}

const StyledP = styled.div`
  margin-top: 3vh;
`;
export default DetailMain;