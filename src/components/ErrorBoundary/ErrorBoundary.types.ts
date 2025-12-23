type ErrorBoundaryProps = { 
    fallback: React.ReactElement,
    children?: React.ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean;
}

export type { ErrorBoundaryProps, ErrorBoundaryState };