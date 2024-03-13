import { DynamicPage, FlexBox } from "@ui5/webcomponents-react";
import DashboardCards from "../components/DashboardCards";
import { dasboardCardData } from "../lib/dashboardCardData";
import DashboardDatePicker from "../components/DashboardDatePicker";
import ActivityCard from "../components/ActivityCard";
// import RiskFactor from "../components/RiskFactor";
import DonutChartCard from "../components/DonutChartCard";
import LineChartCard from "../components/LineChartCard";
import ReportDetails from "../components/ReportDetails";

const Dashboard = () => {
	return (
		<DynamicPage
			headerContentPinnable={false}
			showHideHeaderButton={false}
			headerContent={<DashboardDatePicker />}>
			<FlexBox
				direction="Column"
				data-name="parent">
				<FlexBox
					direction="Column"
					data-name="top">
					{/* FlexBox for DashboardandActivityCardContainer and RiskFactor */}
					<FlexBox
						direction="Row"
						className="gap-x-2"
						data-name="DashboardAndRiskContainer">
						{/* FlexBox for DashboardandActivityCardContainer */}
						<FlexBox
							style={{ width: "75%" }}
							direction="Column"
							data-name="DashboardandActivityCardContainer">
							<FlexBox
								direction="Row"
								style={{ width: "100%" }}
								data-name="ActivityCard">
								<ActivityCard
									title="Activity"
									description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, obcaecati!"
								/>
							</FlexBox>
							<FlexBox
								data-name="DashboardCards"
								direction="Row"
								className="gap-x-2">
								{dasboardCardData.map((cardData, index) => (
									<DashboardCards
										key={index}
										header={cardData.header}
										description={cardData.description}
										count={cardData.count}
									/>
								))}
							</FlexBox>
						</FlexBox>
						{/* FlexBox for RiskFactor */}
						<FlexBox
							// style={{ width: "20%" }}
							data-name="RiskFactor"
							direction="Column">
							{/* // ! Risk Factor Component disabled, Uncomment it when Its fixed */}
							{/* <RiskFactor /> */}
						</FlexBox>
					</FlexBox>
					{/* FlexBox for AnalyticalCards */}
					<FlexBox
						data-name="AnalyticalCards"
						className="gap-x-2">
						<DonutChartCard />
						<LineChartCard />
					</FlexBox>
				</FlexBox>
				<FlexBox className="mt-4 mb-3">
					{/* FlexBox for Table */}
					{/* // ! Placeholder Table, Need to be removed and add the actual table */}
					<ReportDetails />
				</FlexBox>
			</FlexBox>
		</DynamicPage>
	);
};

export default Dashboard;
