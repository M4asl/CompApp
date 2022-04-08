import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styled from "styled-components";
import { createProduct } from "../actions/productActions";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const NewProduct = ({ history }) => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.productCreate
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  useEffect(() => {
    if (success) {
      history.push("/");
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const singleImage = image[0];

    const productData = {
      name,
      description,
      category,
      price,
      image: singleImage,
    };

    dispatch(createProduct(productData));
  };

  const onChangeImage = (e) => {
    const files = Array.from(e.target.files);

    setImage([]);
    setImagePreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage((oldArray) => [...oldArray, reader.result]);
          setImagePreview((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const deleteImage = () => {
    setImage([]);
    setImagePreview([]);
  };

  return (
    <NewProductWrapper>
      <Card>
        <FormContainer onSubmit={handleSubmit}>
          <TextTitle>Create Product</TextTitle>
          <FormGroup>
            <Label htmlFor="name_field">Name</Label>
            <StyledInput
              type="text"
              placeholder="Name"
              id="name_field"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="description_field">Description</Label>
            <StyledInput
              type="text"
              placeholder="Description"
              id="description_field"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="category_field">Category</Label>
            <StyledInput
              type="text"
              placeholder="Category"
              id="category_field"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="price_field">Price</Label>
            <StyledInput
              type="number"
              placeholder="Price"
              id="price_field"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="category_field">Image</Label>
            <StyledInput
              type="file"
              placeholder="Image"
              id="image_field"
              onChange={onChangeImage}
            />
          </FormGroup>

          <Button
            id="create_button"
            type="submit"
            disabled={loading ? true : false}
          >
            {loading ? <Loader /> : "Create"}
          </Button>
        </FormContainer>
      </Card>
      {imagePreview.length > 0 && (
        <ImageWrapper>
          <img
            src={imagePreview}
            key={imagePreview}
            alt="Images Preview"
            style={{ width: "150px", position: "absolute" }}
          />
          <DeleteImageIcon onClick={() => deleteImage()}>
            <AiOutlineCloseCircle />
          </DeleteImageIcon>
        </ImageWrapper>
      )}
    </NewProductWrapper>
  );
};

const NewProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextTitle = styled.h1`
  color: ${({ theme }) => theme.text.secondary};
`;

const Card = styled.div`
  position: relative;
  z-index: 1;
  width: 550px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  @media only ${({ theme }) => theme.breakpoints.md} {
    width: 500px;
  }
  @media only ${({ theme }) => theme.breakpoints.md} {
    width: 400px;
  }
  @media only ${({ theme }) => theme.breakpoints.md} {
    width: 300px;
  }
`;

const Label = styled.label`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const StyledInput = styled.input`
  width: 80%;
  height: 4.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 2rem;
  font-weight: bold;
  &:focus {
    display: inline-block;
    backdrop-filter: blur(12rem);
    border-radius: 2rem;
  }
  &::placeholder {
    color: ${({ theme }) => theme.text.primary};
    font-weight: 100;
    font-size: 2rem;
  }
`;

const FormContainer = styled.form`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const FormGroup = styled.div`
  width: 100%;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  width: 180px;
  min-height: 35px;
  margin: 20px 0px;
  background: transparent;
  color: ${({ theme }) => theme.text.secondary};
  border: 2px solid ${({ theme }) => theme.text.secondary};
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 120px;
  }
  @media only ${({ theme }) => theme.breakpoints.xs} {
    width: 80px;
    min-height: 30px;
    font-size: 1rem;
  }
`;

const ImageWrapper = styled.div`
  width: 150px;
  margin-top: 10px;
`;

const DeleteImageIcon = styled.span`
  font-size: 3rem;
  color: white;
  position: relative;
  left: 79%;
  top: 0%;
`;

export default NewProduct;
