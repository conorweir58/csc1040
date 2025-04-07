import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ProductInfo from "./product_info";

function OrderInfo() {

  const { orderid } = useParams();

  const [orderinfo, setOrderInfo] = useState([]);
  const [orderproducts, setOrderProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const statusOptions = {
    O: "ORDERED",
    P: "PROCESSING",
    S: "SHIPPED",
    D: "DELIVERED"
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/order/${orderid}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setOrderInfo(data))
      .catch((error) => {
        console.error("Error fetching order:", error);
        setOrderInfo([]);
      });

      
      fetch(`http://127.0.0.1:8000/api/orderitem/?order=${orderid}`)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then(async (items) => {
        setOrderProducts(items);

        let total = 0;
        for (const item of items) {
          const productId = item.url?.split("/").filter(Boolean).pop();
          try {
            const res = await fetch(`http://127.0.0.1:8000/api/product/${productId}/`);
            if (!res.ok) throw new Error("Failed to fetch product");
            const productData = await res.json();
            total += item.quantity * productData.price;
          } catch (err) {
            console.error("Error fetching product for total price:", err);
          }
        }

        setTotal(total);
      })
      .catch((error) => {
        console.error("Error fetching order products:", error);
        setOrderProducts([]);
      });
    }, [orderid]);

    
  return (
    <div className="container card">
      <h1 className="text-primary text-center fw-bold m-4">Order Info</h1>

      <div className="container text-center">
            <h2 className=""><strong>Order:</strong> #{orderid}</h2>
            <h3 className="text-secondary"><strong>Customer ID:</strong> #{orderinfo.customer?.split("/").filter(Boolean).pop()}</h3>

            <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>Status:</strong> {statusOptions[orderinfo.status]}</li>
                <li className="list-group-item"><strong>Address:</strong> {orderinfo.shipping_addr}</li>
                <li className="list-group-item"><strong>Ordered On:</strong> {new Date(orderinfo.date_ordered).toLocaleString()}</li>
            </ul>
      </div>

      <h2 className="mt-4">Order Items</h2>
      <div className="row">

        {orderproducts.map((product, index) => (
            <div className="col-lg-4 mb-3" key={index}>
            
            <div className="container card">
            
            <div className="card-body">
                <h4 className="card-title"><strong>Item ID:</strong> #{product.url?.split("/").filter(Boolean).pop()}</h4>
                <h5 className="card-title text-secondary"><strong>Quantity:</strong> {product.quantity}</h5>
                <ProductInfo product={product.url?.split("/").filter(Boolean).pop()} />                
            </div>
            
            </div>

        </div>
        ))}
      </div>

        <h2 className="mt-4"><strong>Total Order Price:</strong> €{total}</h2>

    </div>
  );
}

export default OrderInfo;
