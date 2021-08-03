import { SectionHeader } from "components/Shared/SectionHeader";
import ShareCampaign from "assets/images/shareacampaign.svg";
import StartCampaignIcon from "assets/images/startacampaign.svg";
import WithDrawIcon from "assets/images/withdrawamt.svg";

export const HowItWorks = () => {
  return (
    <section className="host">
      <section className="section-title section-container">
        <SectionHeader
          data={{
            h5: "START A CAMPAIGN IN THREE SIMPLE STEPS",
          }}
        />
      </section>
      <section className="how-it-works">
        <div>
          <img className="icon" src={StartCampaignIcon} alt="Start Campaign" />
          <SectionHeader
            data={{
              h5: "Start your Campaign",
              body1:
                "It’ll take only 2 minutes. Just tell us a few details about you and the ones you are raising funds for.",
            }}
          />
        </div>
        <div>
          <img className="icon" src={ShareCampaign} alt="Share Campaign" />
          <SectionHeader
            data={{
              h5: "Share your Campaign",
              body1:
                "All you need to do is share the Campaign with your friends and family.In no time, support will start pouring in.",
            }}
          />
        </div>
        <div>
          <img className="icon" src={WithDrawIcon} alt="Withdraw Funds" />
          <SectionHeader
            data={{
              h5: "Instantly Withdraw Funds",
              body1:
                "The funds raised can be withdrawn without any hassle directly to your bank account.",
            }}
          />
        </div>
      </section>
    </section>
  );
};
