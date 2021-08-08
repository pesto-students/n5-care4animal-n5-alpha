import { Box, Hidden } from "@material-ui/core";
import { SectionHeader } from "components/Shared/SectionHeader";
import image4 from "assets/images/hero1.jpg";

const InfoSection = () => {
  return (
    <>
      <section className="section group">
        <div className="col span_1_of_2 section-title  section-container">
          <SectionHeader
            data={{
              h4: "Help when it's needed most",
              body1:
                "Throughout India, animals including dogs, cows, cats and donkeys live on the streets. Most cities don't have hospitals for owner-less animals, which means injured or ill animals often die from treatable conditions and some die because of hunger.",
            }}
          />
        </div>
        <Hidden smDown>
          <div className="col span_1_of_2 section-title ">
            <img className="img" src={image4} alt="features"></img>
          </div>
        </Hidden>
      </section>
      <Hidden mdUp>
        <Box marginY={2}>
          <hr className="c4a-divider" />
        </Box>
      </Hidden>

      <section className="section group">
        <div className="col span_1_of_2 section-title section-container">
          <SectionHeader
            data={{
              h4: "Donate for a cause",
              body1:
                "Overpopulation, poverty, pollution, superstition, apathy and ignorance all contribute to their plight. In a country where human misery and impoverishment remain high, the welfare of destitute animals is a low priority.",
            }}
          />
        </div>
        <Hidden smDown>
          <div className="col span_1_of_2 section-title ">
            <img className="img" src={image4} alt="features"></img>
          </div>
        </Hidden>
      </section>
    </>
  );
};

export default InfoSection;
