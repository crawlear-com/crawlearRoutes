type GpxRecorderProps = {
    value: number
    onStartStopRecord: React.MouseEventHandler<HTMLButtonElement>,
    onPause: React.MouseEventHandler<HTMLButtonElement>,
    recordState: boolean,
    pauseState: boolean,
    onPollingTimeChange: (value: number) => void
}

export type { GpxRecorderProps };
