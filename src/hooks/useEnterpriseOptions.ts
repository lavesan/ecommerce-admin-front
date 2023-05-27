import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "./useAppContext";
import { EnterpriseService } from "@services/enterprise.service";

export const useEnterpriseOptions = () => {
  const enterpriseService = EnterpriseService.getInstance();

  const { setIsLoading } = useAppContext();

  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );

  const find = useCallback(async () => {
    const result = await enterpriseService
      .findAll()
      .finally(() => setIsLoading(false));

    const options = result.map(({ id, name }) => ({
      label: name,
      value: id,
    }));

    setOptions(options);
  }, []);

  useEffect(() => {
    find();
  }, [find]);

  return {
    enterpriseOptions: options,
  };
};
