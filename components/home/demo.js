import { useAmp } from 'next/amp';
import Container from '../container';
import Tabs from '../tabs';
import Editor from './editor';
import Browser from '../browser';
import TabButton from './tab-button';

const DEMO_DATA = {
  'File-System Routing': require('./demos/file-system-routing').default,
  'Automatic Code Splitting': require('./demos/code-splitting').default,
  'More...': require('./demos/more').default
};

export default function Demo() {
  const isAmp = useAmp();
  return (
    <div className="demo-section">
      <Container center dark wide role="region">
        <Container center>
          <Tabs ampKey="demoTabs" data={Object.keys(DEMO_DATA)} anchor>
            {(onSelect, selectedId) => (
              <div>
                <div className="demo-header">
                  {Object.keys(DEMO_DATA).map(id =>
                    id === 'More...' ? null : (
                      <TabButton
                        invert
                        className="tab"
                        key={`tab-${id}`}
                        selected={selectedId === id}
                        onClick={isAmp ? undefined : () => onSelect(id)}
                        on={
                          isAmp
                            ? `tap:AMP.setState({ demoTabs: { selected: ${JSON.stringify(id)} } })`
                            : undefined
                        }
                      >
                        {id}
                      </TabButton>
                    )
                  )}
                  <TabButton
                    invert
                    className="tab"
                    selected={selectedId === 'More...'}
                    onClick={isAmp ? undefined : () => onSelect('More...')}
                    on={
                      isAmp ? `tap:AMP.setState({ demoTabs: { selected: 'More...' } })` : undefined
                    }
                  >
                    {'More...'}
                  </TabButton>
                </div>
                <div className="demo-body row display-tablet">
                  {(() => {
                    const dataShort = DEMO_DATA[selectedId];
                    if (!dataShort.type.length) {
                      return dataShort.body || null;
                    }

                    const uniqueId = 'a'.concat(Math.random().toString(36).substring(2, 15));
                    return (
                      <div className="column">
                        <Tabs ampKey={uniqueId} data={dataShort.tabs}>
                          {(onSelect, _selectedId) => {
                            let content = null;
                            const data = DEMO_DATA[selectedId];
                            if (_selectedId === data.tabs[0]) {
                              content =
                                data.type[0] === 'editor' ? (
                                  <Editor data={data.editor1} />
                                ) : (
                                  <Browser data={data.browser1} />
                                );
                            } else {
                              content =
                                data.type[1] === 'editor' ? (
                                  <Editor data={data.editor2} />
                                ) : (
                                  <Browser data={data.browser2} />
                                );
                            }
                            return (
                              <div>
                                {content}
                                <br />
                                <TabButton
                                  invert
                                  light
                                  selected={_selectedId === data.tabs[0]}
                                  onClick={isAmp ? undefined : () => onSelect(data.tabs[0])}
                                  on={
                                    isAmp
                                      ? `tap:AMP.setState({ ${uniqueId}: { selected: ${JSON.stringify(
                                          data.tabs[0]
                                        )} } })`
                                      : undefined
                                  }
                                >
                                  {data.tabs[0]}
                                </TabButton>
                                <TabButton
                                  invert
                                  light
                                  selected={_selectedId === data.tabs[1]}
                                  onClick={isAmp ? undefined : () => onSelect(data.tabs[1])}
                                  on={
                                    isAmp
                                      ? `tap:AMP.setState({ ${uniqueId}: { selected: ${JSON.stringify(
                                          data.tabs[1]
                                        )} } })`
                                      : undefined
                                  }
                                >
                                  {data.tabs[1]}
                                </TabButton>
                              </div>
                            );
                          }}
                        </Tabs>
                      </div>
                    );
                  })()}
                </div>
                <div className="demo-body row hide-tablet">
                  {(() => {
                    const data = DEMO_DATA[selectedId];
                    if (!data.type.length) {
                      return data.body || null;
                    }

                    const content1 =
                      data.type[0] === 'editor' ? (
                        <Editor data={data.editor1} />
                      ) : (
                        <Browser data={data.browser1} />
                      );
                    const content2 =
                      data.type[1] === 'editor' ? (
                        <Editor data={data.editor2} />
                      ) : (
                        <Browser data={data.browser2} />
                      );

                    return (
                      <>
                        <div className="column">{content1}</div>
                        <div className="column">{content2}</div>
                      </>
                    );
                  })()}
                </div>
                <div className="demo-footer">
                  <div className="note">{DEMO_DATA[selectedId].note}</div>
                </div>
              </div>
            )}
          </Tabs>
        </Container>
      </Container>
      <style jsx>{`
        .demo-body :global(.editor .content) {
          padding: 1rem;
        }
        .demo-body :global(.editor pre) {
          margin: 0;
          white-space: pre-wrap;
        }
        .demo-body :global(.editor .token) {
          color: #f1f1f1;
        }

        .demo-body :global(.editor .token.plain-text) {
          color: #c3c3c3;
        }

        .demo-header {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 2rem 0;
        }
        .demo-footer {
          display: flex;
          margin: 2rem 0;
          align-items: flex-start;
          justify-content: space-between;
        }
        .note {
          max-width: 620px;
          text-align: left;
        }
        .note :global(p) {
          margin-top: 0;
        }
        .note :global(p):last-of-type {
          margin-bottom: 0;
        }
        // CSS only media query for tablet
        @media screen and (max-width: 960px) {
          .demo-header {
            flex-wrap: wrap;
          }
          .demo-footer {
            flex-direction: column;
            align-items: center;
          }
        }

        @media screen and (max-width: 500px) {
          .demo-section {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
