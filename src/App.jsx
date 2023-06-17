import { ProductiveCard } from "@carbon/ibm-products/lib/components";
import {
  Button,
  ButtonSkeleton,
  Column,
  ComposedModal,
  FormGroup,
  Grid,
  ModalBody,
  ModalHeader,
  SkeletonPlaceholder,
  TextInput,
} from "@carbon/react";
import { Add, Edit, TrashCan } from "@carbon/react/icons";
import { Text } from "@carbon/react/lib/components/Text";
import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(0);
  const [form, setForm] = useState({
    title: "",
    paragraph: "",
  });

  const handleChange = (e) => {
    setForm((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    setLoading(true);
    setForm({
      title: "",
      paragraph: "",
    });
    setOpenModal(false);
    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then(() => {
      handleGetPosts();
    });
  };

  const handleUpdate = () => {
    setLoading(true);
    setOpenModal(false);
    fetch(`http://localhost:3000/posts/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then(() => {
      handleGetPosts();
    });
  };

  const handleEdit = (post) => {
    setEdit(true);
    setEditId(post.id);
    setOpenModal(true);
    setForm({
      title: `${post.title}`,
      paragraph: `${post.paragraph}`,
    });
  };

  const handleDelete = (id) => {
    setLoading(true);
    fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
    }).then(() => {
      handleGetPosts();
    });
  };

  const handleGetPosts = () => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    handleGetPosts();
  }, []);

  if (loading)
    return (
      <>
        <Grid fullWidth>
          <Column sm={4} md={2} lg={2}>
            <ButtonSkeleton />
          </Column>
        </Grid>
        <Grid fullWidth>
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <Column key={index} sm={4} md={4} lg={4}>
                <SkeletonPlaceholder className="card-placeholder" />
              </Column>
            ))}
        </Grid>
      </>
    );

  return (
    <>
      <Grid fullWidth>
        <Column sm={4} md={2} lg={2}>
          <Button renderIcon={Add} onClick={() => setOpenModal(true)}>
            Add
          </Button>
          <ComposedModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            size="lg"
          >
            <ModalHeader />
            <ModalBody>
              <FormGroup
                legendId="form-group-1"
                legendText="FormGroup Legend"
                style={{
                  maxWidth: "400px",
                }}
              >
                <div>
                  <TextInput
                    id="Title"
                    labelText="Title"
                    value={form.title}
                    onChange={handleChange}
                    name="title"
                  />
                  <TextInput
                    id="Paragraph"
                    labelText="Paragraph"
                    value={form.paragraph}
                    onChange={handleChange}
                    name="paragraph"
                  />
                  {edit ? (
                    <Button type="submit" onClick={handleUpdate}>
                      Update
                    </Button>
                  ) : (
                    <Button type="submit" onClick={handleSubmit}>
                      Submit
                    </Button>
                  )}
                </div>
              </FormGroup>
            </ModalBody>
          </ComposedModal>
        </Column>
      </Grid>
      <Grid fullWidth>
        {posts.map((post) => (
          <Column key={post.id} sm={4} md={4} lg={4}>
            <ProductiveCard
              style={{
                height: "100%",
              }}
              actionIcons={[
                {
                  icon: Edit,
                  iconDescription: "Edit",
                  id: "1",
                  onClick: () => handleEdit(post),
                },
                {
                  icon: TrashCan,
                  iconDescription: "Delete",
                  id: "2",
                  onClick: () => handleDelete(post.id),
                },
              ]}
              onClick={function noRefCheck() {}}
              onKeyDown={function noRefCheck() {}}
              primaryButtonText="Details"
              title={post.title}
            >
              <Text>{post.paragraph}</Text>
            </ProductiveCard>
          </Column>
        ))}
      </Grid>
    </>
  );
}

export default App;
