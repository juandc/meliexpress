import { BaseContent, SearchResult } from "@/components/isomorphic";

export default function SearchPage() {
  return (
    <BaseContent
      breadcrumb={(
        "breadcrumb"
      )}
    >
      <SearchResult
        id="1"
        title="Paquete De 4 Cestas De Mimbre Con Tapas, Cestas De Almacena."
        price={{
          currency: "COP",
          amount: 294,
          decimals: 294.123,
        }}
        condition="New?"
        free_shipping
        picture="https://http2.mlstatic.com/D_NQ_NP_2X_617247-MCO74372138178_022024-F.webp"
        isFirst
      />
      <SearchResult
        id="1"
        title="Escritorio Gamer Madesa Para Pc Y Consola Roble 4,91.7374,9 de 5 estrellas. 1.737 opiniones del producto."
        price={{
          currency: "COP",
          amount: 123,
          decimals: 123,
        }}
        condition="New?"
        free_shipping
        picture="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSk6HKCNVsg1fK6VxBIOy2VqIi4u0kArYo05Hcd7RMMcFS8UPkZHrq0_UQVRyHciX1fgbvoovvVImtQIn87rlo_4zqZ2OcmlRoBLh7hBgI&usqp=CAE"
      />
    </BaseContent>
  );
}
