import React, { PureComponent } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ElevatedView from 'react-native-elevated-view';
import { strings } from '../../../../locales/i18n';
import { colors, fontStyles } from '../../../styles/common';
import Device from '../../../util/Device';

const BROWSER_ROUTE = 'BrowserView';

const styles = StyleSheet.create({
	backupAlertWrapper: {
		flex: 1,
		backgroundColor: colors.orange000,
		borderColor: colors.yellow200,
		borderWidth: 1,
		position: 'absolute',
		left: 16,
		right: 16,
		borderRadius: 8,
		padding: 8
	},
	backupAlertIconWrapper: {
		marginRight: 13
	},
	backupAlertIcon: {
		fontSize: 22,
		color: colors.yellow700
	},
	backupAlertTitle: {
		fontSize: 12,
		lineHeight: 17,
		color: colors.yellow700,
		...fontStyles.bold
	},
	backupAlertMessage: {
		fontSize: 10,
		lineHeight: 14,
		color: colors.yellow700,
		...fontStyles.normal
	},
	touchableView: {
		flexDirection: 'row'
	},
	modalViewInBrowserView: {
		bottom: Device.isIphoneX() ? 90 : 80
	},
	modalViewNotInBrowserView: {
		bottom: Device.isIphoneX() ? 20 : 10
	}
});

/**
 * PureComponent that renders an alert shown when the
 * seed phrase hasn't been backed up
 */
export default class BackupAlert extends PureComponent {
	static propTypes = {
		navigation: PropTypes.object,
		/**
		 * The action that will be triggered onPress
		 */
		onPress: PropTypes.any
	};

	state = {
		inBrowserView: false
	};

	componentDidUpdate = async prevProps => {
		// Check whether current view is browser
		if (prevProps.navigation.state !== this.props.navigation.state) {
			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({ inBrowserView: this.isInBrowserView(prevProps) });
		}
	};

	isInBrowserView = () => {
		const currentRouteName = this.findRouteNameFromNavigatorState(this.props.navigation.state);
		return currentRouteName === BROWSER_ROUTE;
	};

	findRouteNameFromNavigatorState({ routes }) {
		let route = routes[routes.length - 1];
		while (route.index !== undefined) route = route.routes[route.index];
		return route.routeName;
	}

	render() {
		const { onPress } = this.props;
		const { inBrowserView } = this.state;
		return (
			<ElevatedView
				elevation={100}
				style={[
					styles.backupAlertWrapper,
					inBrowserView ? styles.modalViewInBrowserView : styles.modalViewNotInBrowserView
				]}
			>
				<TouchableOpacity onPress={onPress} style={styles.touchableView}>
					<View style={styles.backupAlertIconWrapper}>
						<Icon name="info-outline" style={styles.backupAlertIcon} />
					</View>
					<View>
						<Text style={styles.backupAlertTitle}>{strings('browser.backup_alert_title')}</Text>
						<Text style={styles.backupAlertMessage}>{strings('browser.backup_alert_message')}</Text>
					</View>
				</TouchableOpacity>
			</ElevatedView>
		);
	}
}
