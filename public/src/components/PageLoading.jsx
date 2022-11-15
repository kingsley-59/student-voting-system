import React from 'react'
import { useSelector } from 'react-redux'

const PageLoading = () => {
    const { loading } = useSelector(state => state)
  
    return (
        <React.Fragment>
            {loading.pageLoading && (
                <div className="preloader">
                    <div className="loader rubix-cube">
                        <div className="layer layer-1"></div>
                        <div className="layer layer-2"></div>
                        <div className="layer layer-3 color-1"></div>
                        <div className="layer layer-4"></div>
                        <div className="layer layer-5"></div>
                        <div className="layer layer-6"></div>
                        <div className="layer layer-7"></div>
                        <div className="layer layer-8"></div>
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}

export default PageLoading
