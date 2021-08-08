import { Container, Typography } from "@material-ui/core";
import { Icon } from "@iconify/react";
import {} from "@iconify/icons-ant-design";

export const Tile = () => {
  <div>
    <Container>
      <Icon icon={androidFilled} width={24} height={24} />
    </Container>
    <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
    <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
      Weekly Sales
    </Typography>
  </div>;
};
