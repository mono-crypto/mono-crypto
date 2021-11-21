import * as React from 'react';

const withCoinListModal = (WrappedComponent) => (props) => {
    const Component = props => {
        return <WrappedComponent {...props} />
    }
    return Component
}
export default withCoinListModal
