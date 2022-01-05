import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BoxGrid({id,title,description,data,url}) {
  return (
    <Box sx={{ m: 2 }} xl={3} xs={4} md={6} sm={12}>
      <Grid container >
        <Grid item xs={12}>
          <Item>{id}
           <div>{title}</div>
           <div>{description}</div>
           <div>{data}</div>
           <div>{url}</div>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
