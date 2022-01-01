import React, { useEffect } from "react";
// styles
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CardActions from "@mui/material/CardActions";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFromCategories } from "../../slices/categorySlice";
import { selectCategories } from "../../slices/categorySlice";
import { useSelector } from "react-redux";
import EditIconofCategoryCard from "../EditIconOfCategoryCard/EditIconOfCategoryCard";
const cardStyle = {
  // backgroundColor: "#CBC3E3",
  // card: {
  //   height: "230px",
  //   width: "180px",
  // },
  // img: {
  //   height: "100px",
  //   objectFit: "cover",
  // },
  options: {
    justifyContent: "center",
  },
};
function CategoryCard({ title, categoryImage, id }) {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  //to resfreh component

  const removeCardOnDeleteClicked = (event) => {
    const deleteCategoryFromDatabase = async () => {
      try {
        const res = await axios.delete(
          `https://menuhub-backend.herokuapp.com/category/delete/${id}`
        );

        dispatch(removeFromCategories(id));
      } catch (err) {}
    };

    deleteCategoryFromDatabase();
  };

  const stopCardClickEventOnCardActionsArea = (event) => {
    event.stopPropagation();
  };
  return (
    <Card style={cardStyle.card}>
      <CardActionArea>
        {categoryImage && (
          <CardMedia
            style={cardStyle.img}
            component="img"
            image={`https://menuhub-backend.herokuapp.com/upload/${categoryImage}`}
            alt="green iguana"
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" align="center" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        onClick={(event) => stopCardClickEventOnCardActionsArea(event)}
        style={cardStyle.options}
      >
        <IconButton
          onClick={(event) => removeCardOnDeleteClicked(event)}
          color="error"
          aria-label="add to favorites"
        >
          <DeleteIcon />
        </IconButton>
        <EditIconofCategoryCard id={id} />
      </CardActions>
    </Card>
  );
}

export default CategoryCard;
