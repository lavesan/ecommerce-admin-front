import { ProductService } from "@services/product.service";
import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "./useAppContext";

export const useProductOptions = (enterpriseId?: string) => {
  const productService = ProductService.getInstance();

  const { setIsLoading } = useAppContext();

  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );

  const find = useCallback(async () => {
    if (enterpriseId) {
      const result = await productService
        .findByEnterpriseId(enterpriseId)
        .finally(() => setIsLoading(false));

      const options = result.map(({ id, name }) => ({
        label: name,
        value: id,
      }));

      setOptions(options);
    }
  }, [enterpriseId]);

  useEffect(() => {
    find();
  }, [find]);

  return {
    productsOptions: options,
  };
};
