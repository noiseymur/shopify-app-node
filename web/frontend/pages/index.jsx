import {
  Card,
  Page,
  Layout,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export default function HomePage() {
  return (
    <Page narrowWidth>
      <TitleBar title="" primaryAction={null} />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            Tada!
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
