import React from "react";
import styles from "./MyComponent.module.css";
import { SilkeButton, SilkeBox, SilkeTextField, SilkeText } from "@vev/silke";
import { registerVevComponent } from "@vev/react";

type Props = {
  title: string;
};

const MyComponent = ({ hostRef, ...props }) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <h2>Props</h2>
        {JSON.stringify(props, null, 2)}
      </div>
    </div>
  );
};

const FetchData = ({ value, onChange }) => {
  const [productId, setProductId] = React.useState(null);
  const [isFetching, setIsFetching] = React.useState(false);

  const handleFetch = React.useCallback(() => {
    if (!productId) return;

    setIsFetching(true);
    fetch('https://fakestoreapi.com/products/' + productId, {
      headers: { authorization: 'Bearer 123' }
    })
      .then(res => res.json())
      .then(data => {
        setIsFetching(false);
        onChange(data);
      })
  }, [productId]);

  return (
    <SilkeBox column fill gap="s">
      <SilkeText>Fetch Data</SilkeText>
      <SilkeTextField
        label="Product ID"
        type="number"
        value={productId}
        onChange={setProductId}
        help="Can be 1,2,3 etc"
      />
      <SilkeBox gap="s">
        <SilkeButton onClick={handleFetch} label="Fetch data" size="s" loading={isFetching} />
        <SilkeButton onClick={() => onChange({})} label="Clear data" kind="danger" size="s" />
      </SilkeBox>
    </SilkeBox>
  );
};

registerVevComponent(MyComponent, {
  name: "MyComponent",
  props: [
    { name: "data", type: "object", storage: "project", component: FetchData, fields: [] },
  ],
  type: 'standard',
});

export default MyComponent;
