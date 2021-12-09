interface AntiBodyProps {
  style: string
}
const AntiBodySVG = (props: AntiBodyProps) => (
  <div data-cy="result-icon" className={`anti-body-${props.style}`}>
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
      <g fill="#007AFF" fillRule="evenodd">
        <circle cx="32" cy="32" r="32" fillOpacity=".25" />
        <path
          d="M20.289 15l11.006 11.006v22.48H27.28V27.67l-9.83-9.832L20.289 15zm23.218 0l2.838 2.838-9.83 9.83v20.819H32.5V26.006L43.507 15zm3.655 3.359L50 21.197 39.915 31.282l-2.838-2.838 10.085-10.085zm-30.324 0l10.085 10.085-2.838 2.838L14 21.197l2.838-2.838z"
          fillRule="nonzero"
        />
      </g>
    </svg>
  </div>
)
export default AntiBodySVG
