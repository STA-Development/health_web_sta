import PureBlock from "component/pureBlock";
import Image from "next/image";
import ResultHeader from "./resultsHeader";
export default function NoResults() {
    return(
        <div className="web-portal-results" data-cy="no-tests">
            <PureBlock center={true} flow={false} isNoResults={true}>
                <div>
                    <Image src='/search.svg' width={86} height={96} alt={"No Results"}/>
                </div>
                <div>
                    <ResultHeader size={32} header="Results Will Appear Here" />
                    <span className="message">Once you have used our service, results of the tests will appear here and you can download the report for each</span>
                </div>
            </PureBlock>
        </div>
    )
}