import { FC } from "react";
import { DocuPdfProps, formatNumber } from "../utils";
import { Document, Page, View, Text } from "@react-pdf/renderer";

export const DocuPdf: FC<DocuPdfProps> = ({ product }) => {
  return (
    <Document>
      <Page size="A4">
        <View
        /*               style={{
                borderRadius: "8px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                backgroundColor: "rgb(255 255 255)",
              }} */
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "15px",
              width: "100%",
            }}
          >
            <View
              style={{
                width: "45%",
              }}
            >
              <Text
                style={{
                  fontSize: "20px",
                  textAlign: "left",
                }}
              >
                PDF Design
              </Text>
            </View>
            <View
              style={{
                width: "45%",
              }}
            >
              <Text
                style={{
                  fontSize: "20px",
                  textAlign: "right",
                }}
              >
                Product Details
              </Text>
            </View>
          </View>
          <View
          /*                 style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  padding: "20px",
                  border:
                    "1px solid rgb(226 232 240)",
                  borderTopLeftRadius: "4px",
                  borderTopRightRadius: "4px",
                }} */
          >
            <Text
              style={{
                fontSize: "30px",
                fontWeight: "extrabold",
                color: "black",
                textAlign: "center",
                textTransform: "capitalize",
                padding: 10
              }}
            >
              {product.name}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              padding: "6px",
              width: "100%",
              border: "1px solid black",
            }}
          >
            <View style={{ width: "45%", border: "1px solid red" }}>
              <Text
                style={{
                  marginTop: "16px",
                  marginBottom: "16px",
                  color: "black",
                  fontSize: "18px",
                }}
              >
                Image: {product.image}
              </Text>
            </View>
            <View style={{ width: "45%", border: "1px solid blue" }}>
              <Text
                style={{
                  marginTop: "16px",
                  marginBottom: "16px",
                  color: "black",
                  fontSize: "18px",
                }}
              >
                Price: ${formatNumber({value: product.price})}
              </Text>
              <Text
                style={{
                  marginTop: "16px",
                  marginBottom: "16px",
                  color: "black",
                  fontSize: "18px",
                }}
              >
                Quantity: {formatNumber({value: product.quantity})}
              </Text>
              <Text
                style={{
                  marginTop: "16px",
                  marginBottom: "16px",
                  color: "black",
                  fontSize: "18px",
                }}
              >
                Description: {product.description}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
