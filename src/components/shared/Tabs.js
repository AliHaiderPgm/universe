import * as React from 'react';
import { ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { colors } from '../constants/theme';

export default Tabs = () => {
    const FirstRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#fe4681' }} />
    );

    const SecondRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
    );

    const ThirdRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#53aba6' }} />
    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
    });

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: colors.black, height: 3 }}
            style={{ backgroundColor: colors.light, }}
            activeColor={colors.black}
            inactiveColor={colors.lightGray}
            labelStyle={{ fontWeight: '600' }}

        />
    );

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Men' },
        { key: 'second', title: 'Women' },
        { key: 'third', title: 'Child' },
    ]);

    return (
        <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    );
}