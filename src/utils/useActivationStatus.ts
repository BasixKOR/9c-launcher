import { ApolloError } from "@apollo/client";
import { useActivationAddressQuery } from "src/generated/graphql";
import { useLoginSession } from "./useLoginSession";

interface ActivationResult {
  loading: boolean;
  error?: ApolloError;
  activated: boolean;
}

/**
 * Queries the activation status of the current account.
 *
 * @returns {ActivationResult} A object with two properties: `loading` and `activated`. They are pretty self-explanatory.
 */

export function useActivationStatus(
  usePolling: boolean = false
): ActivationResult {
  const address = useLoginSession()?.address;

  const { loading, data, error } = useActivationAddressQuery({
    variables: {
      address: address?.toString(),
    },
    pollInterval: usePolling ? 1000 : undefined,
    skip: !address,
  });

  return {
    loading,
    error,
    activated: data?.activationStatus.addressActivated ?? false,
  };
}
