import React, { useState } from "react";
import { observer } from "mobx-react";
import Layout from "src/v2/components/core/Layout";
import { T } from "src/renderer/i18n";
import H1 from "src/v2/components/ui/H1";
import Button from "src/v2/components/ui/Button";
import H2 from "src/v2/components/ui/H2";
import { styled } from "src/v2/stitches.config";
import { useStore } from "src/v2/utils/useStore";
import { useHistory } from "react-router";
import ImportInput, { ImportData } from "src/v2/components/ImportInput";
import { FileError } from "react-dropzone";

const transifexTags = "v2/import-view";

const ButtonBar = styled("div", {
  display: "flex",
  "& > * + *": { marginLeft: 16 },
  justifyContent: "center",
});

// https://github.com/moreal/libplanet/blob/7905c147f9b86938f2fec983dbea3d6a1919fec0/Libplanet/KeyStore/Web3KeyStore.cs#L31
// FIXME: This should be handled by the headless.
const keyFilenameRegex = /^UTC--\d{4}-\d\d-\d\dT\d\d-\d\d-\d\dZ--([\da-f]{8}-?(?:[\da-f]{4}-?){3}[\da-f]{12})$/i;

function fileValidator(f: File): FileError | null {
  if (f.name.match(keyFilenameRegex)) return null;
  return {
    message: "Invalid key filename",
    code: "INVALID_KEY_FILENAME",
  };
}

function ImportView() {
  const account = useStore("account");
  const history = useHistory();

  const [key, setKey] = useState<ImportData>({});

  const handleSubmit = () => {
    if (!key.key) return;
    account.setPrivateKey(key.key);
    history.push("/recover");
  };

  return (
    <Layout sidebar>
      <H1>
        <T _str="Register Your Key" _tags={transifexTags} />
      </H1>
      <H2>
        <T
          _str="Register your backed up key file or key string."
          _tags={transifexTags}
        />
      </H2>
      <ImportInput
        onSubmit={setKey}
        fromFile={key.fromFile}
        fileValidator={fileValidator}
      />
      <ButtonBar>
        <Button onClick={history.goBack.bind(history)}>
          <T _str="Prev" _tags={transifexTags} />
        </Button>
        <Button variant="primary" disabled={!key.key} onClick={handleSubmit}>
          <T _str="Next" _tags={transifexTags} />
        </Button>
      </ButtonBar>
    </Layout>
  );
}

export default observer(ImportView);
