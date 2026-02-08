import * as React from "react";

type readOnlyStatus = {
    disabled: boolean;
}

const useRecButton = (recordState: boolean, onPollingTimeChange: (value: number) => void):
  [ readOnlyStatus,  (e: React.ChangeEvent<HTMLInputElement>) => void] => {
    const readOnlyStatus = { disabled: recordState };

    const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = Number((e.target as HTMLInputElement).value);

        value = Math.max(value, Number(e.target.min));
        onPollingTimeChange(value);
    }

    return [ readOnlyStatus, onValueChange ];
}

export default useRecButton;