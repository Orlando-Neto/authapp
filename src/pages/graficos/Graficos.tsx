import { Box, Card, CardContent, Grid } from "@mui/material";
import EChartsReact from "echarts-for-react";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useAppThemeContext } from "../../shared/context";

export const Graficos = () => {

    const { themeName } = useAppThemeContext()

    const option = {
        title: {
          text: 'Referer of a Website',
          subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: [
              { value: 500, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
    };

    const optionGrade = {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          center: ['50%', '75%'],
          radius: '90%',
          min: 0,
          max: 1,
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              width: 6,
              color: [
                [0.25, '#ff6e76'],
                [0.5, '#FDDD60'],
                [0.75, '#58D9F9'],
                [1, '#7CFFB2']
              ]
            }
          },
          pointer: {
            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            length: '12%',
            width: 20,
            offsetCenter: [0, '-60%'],
            itemStyle: {
              color: 'inherit'
            }
          },
          axisTick: {
            length: 12,
            lineStyle: {
              color: 'inherit',
              width: 2
            }
          },
          splitLine: {
            length: 20,
            lineStyle: {
              color: 'inherit',
              width: 5
            }
          },
          axisLabel: {
            color: '#d6d6d6',
            fontSize: 20,
            distance: -60,
            rotate: 'tangential',
            formatter: function (value: number) {
              if (value === 0.875) {
                return 'Grade A';
              } else if (value === 0.625) {
                return 'Grade B';
              } else if (value === 0.375) {
                return 'Grade C';
              } else if (value === 0.125) {
                return 'Grade D';
              }
              return '';
            }
          },
          detail: {
            fontSize: 30,
            offsetCenter: [0, '-35%'],
            valueAnimation: true,
            formatter: function (value: number) {
              return Math.round(value * 100) + '';
            },
            color: 'inherit'
          },
          data: [
            {
              value: 0.7,
              name: 'Grade Rating'
            }
          ]
        }
      ]
    };
    
    const optionLine = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    };

    return (
      <LayoutBaseDePagina title="" toolbar="">
          <Grid container spacing={1} margin={1} width="auto">
            <Grid container item spacing={1} xs={12}>
              <Grid item xs={12} md={6} lg={6} xl={4}>
                <Card variant="outlined">
                  <CardContent>
                    <EChartsReact theme={themeName} option={option} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={6} xl={4}>
                <Card variant="outlined">
                  <CardContent>
                    <EChartsReact theme={themeName} option={optionGrade} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid container item>
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <EChartsReact theme={themeName} option={optionLine} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
      </LayoutBaseDePagina>
    );
}