const RippleLoader = () => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="104" height="104" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="50" cy="50" r="0" fill="none" stroke="#b77b54" stroke-width="2">
                <animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;45" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s"/>
                <animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s"/>
            </circle>
            <circle cx="50" cy="50" r="0" fill="none" stroke="#fcd390" stroke-width="2">
                <animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;45" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.5s"/>
                <animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.5s"/>
            </circle>
        </svg>
    )
}

export default RippleLoader
