import { Box, Button, Hidden, Typography } from "@material-ui/core";
import { SectionHeader } from "components/Shared/SectionHeader";

const InfoSection = ({ showStartCampaign, showSearchPage }) => {
  return (
    <>
      <section className="section group">
        <div className="col span_1_of_2 section-title  section-container">
          <Box p={4} className="text-center">
            <SectionHeader
              data={{
                h4: "Help when it's needed most",
                body1:
                  "Throughout India, animals including dogs, cows, cats and donkeys live on the streets. Most cities don't have hospitals for owner-less animals, which means injured or ill animals often die from treatable conditions and some die because of hunger.",
              }}
            />
            <Box py={4}>
              <Button
                className="primary-btn"
                variant="contained"
                onClick={showStartCampaign}
              >
                Start a Campaign{" "}
              </Button>
            </Box>
          </Box>
        </div>
        <Hidden smDown>
          <div className="col span_1_of_2 section-title ">
            <img
              className="img"
              src={"https://source.unsplash.com/76HhAKI5JXI"}
              alt="features"
            ></img>
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
          <Box p={4} className="text-center">
            <SectionHeader
              data={{
                h4: "Donate for a cause",
                body1:
                  "Overpopulation, poverty, pollution, superstition, apathy and ignorance all contribute to their plight. In a country where human misery and impoverishment remain high, the welfare of destitute animals is a low priority.",
              }}
            />
            <Box py={4}>
              <Button
                className="primary-btn"
                variant="contained"
                color="secondary"
                onClick={showSearchPage}
              >
                Donate Now{" "}
              </Button>
            </Box>
          </Box>
        </div>
        <Hidden smDown>
          <div className="col span_1_of_2 section-title ">
            <img
              className="img"
              src={"https://source.unsplash.com/PcEOcfaT8s0"}
              alt="features"
            ></img>
          </div>
        </Hidden>
      </section>
    </>
  );
};

export default InfoSection;
