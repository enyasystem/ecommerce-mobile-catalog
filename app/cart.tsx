import React, { useMemo } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Image,
	FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import {
	increaseQuantity,
	decreaseQuantity,
	removeFromCart,
	clearCart,
} from '../features/cart/cartSlice';

const TAX_RATE = 0.08; // 8% tax

export default function CartScreen() {
	const router = useRouter();
	const dispatch = useDispatch();
	const cartItems = useSelector((state: RootState) => state.cart.items);

	// Calculate totals
	const { subtotal, tax, total } = useMemo(() => {
		const sub = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
		const t = sub * TAX_RATE;
		const tot = sub + t;
		return {
			subtotal: sub,
			tax: t,
			total: tot,
		};
	}, [cartItems]);

	const handleClearCart = () => {
		dispatch(clearCart());
	};

	return (
		<SafeAreaView style={styles.container} edges={['top', 'bottom']}>
			{/* Header */}
			<View style={styles.header}>
				<View style={{ width: 40 }} />
				<Text style={styles.headerTitle}>My Cart</Text>
				<TouchableOpacity style={{ width: 40 }} onPress={handleClearCart}>
					<Text style={styles.clearBtn}>Clear</Text>
				</TouchableOpacity>
			</View>

			{/* Cart Items */}
			{cartItems.length === 0 ? (
				<View style={styles.emptyContainer}>
					<MaterialCommunityIcons name="shopping-outline" size={64} color="rgba(255, 255, 255, 0.3)" />
					<Text style={styles.emptyText}>Your cart is empty</Text>
					<TouchableOpacity
						style={styles.browseBtn}
						onPress={() => router.push('/browse')}
					>
						<Text style={styles.browseBtnText}>Start Shopping</Text>
					</TouchableOpacity>
				</View>
			) : (
				<>
					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={styles.scrollContent}
					>
						{cartItems.map((item) => (
							<View key={item.id} style={styles.cartItemCard}>
								{/* Mesh gradient backgrounds */}
								<View style={[styles.gradientBlob, { top: -20, right: -30 }]} />
								<View style={[styles.gradientBlob, { bottom: -20, left: -30 }]} />

								{/* Item Content */}
								<View style={styles.itemContent}>
									{/* Image */}
									<View style={styles.imageContainer}>
										<Image
											source={{ uri: item.image }}
											style={styles.itemImage}
										/>
									</View>

									{/* Item Details */}
									<View style={styles.itemDetails}>
										<View>
											<Text style={styles.itemName} numberOfLines={2}>
												{item.name}
											</Text>
											{item.color && (
												<Text style={styles.itemColor}>{item.color}</Text>
											)}
										</View>

										{/* Price and Quantity */}
										<View style={styles.itemFooter}>
											<Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>

											{/* Quantity Controls */}
											<View style={styles.quantityControl}>
												<TouchableOpacity
													style={styles.quantityBtn}
													onPress={() =>
														dispatch(decreaseQuantity(item.id))
													}
													activeOpacity={0.7}
												>
													<MaterialCommunityIcons
														name="minus"
														size={14}
														color="rgba(255, 255, 255, 0.7)"
													/>
												</TouchableOpacity>

												<Text style={styles.quantityText}>
													{item.quantity}
												</Text>

												<TouchableOpacity
													style={[styles.quantityBtn, styles.quantityBtnActive]}
													onPress={() =>
														dispatch(increaseQuantity(item.id))
													}
													activeOpacity={0.7}
												>
													<MaterialCommunityIcons
														name="plus"
														size={14}
														color="#fff"
													/>
												</TouchableOpacity>
											</View>
										</View>
									</View>

									{/* Remove Button */}
									<TouchableOpacity
										style={styles.removeBtn}
										onPress={() =>
											dispatch(removeFromCart(item.id))
										}
										activeOpacity={0.7}
									>
										<MaterialCommunityIcons
											name="trash-can-outline"
											size={18}
											color="rgba(255, 255, 255, 0.6)"
										/>
									</TouchableOpacity>
								</View>
							</View>
						))}
					</ScrollView>

					{/* Summary Section - Fixed at Bottom */}
					<View style={styles.summarySection}>
						{/* Gradient Fade */}
						<View style={styles.gradientFade} />

						{/* Summary Card */}
						<View style={styles.summaryCard}>
							{/* Pricing Details */}
							<View style={styles.pricingDetails}>
								<View style={styles.pricingRow}>
									<Text style={styles.pricingLabel}>Subtotal</Text>
									<Text style={styles.pricingValue}>
										${subtotal.toFixed(2)}
									</Text>
								</View>

								<View style={styles.pricingRow}>
									<Text style={styles.pricingLabel}>
										Tax ({(TAX_RATE * 100).toFixed(0)}%)
									</Text>
									<Text style={styles.pricingValue}>
										${tax.toFixed(2)}
									</Text>
								</View>

								<View style={styles.divider} />

								<View style={[styles.pricingRow, styles.totalRow]}>
									<Text style={styles.totalLabel}>Total</Text>
									<Text style={styles.totalPrice}>
										${total.toFixed(2)}
									</Text>
								</View>
							</View>

							{/* Checkout Button */}
							<TouchableOpacity
								style={styles.checkoutBtn}
								activeOpacity={0.8}
								onPress={() => router.push('/')}
							>
								<Text style={styles.checkoutBtnText}>
									Proceed to Checkout
								</Text>
								<MaterialCommunityIcons
									name="arrow-right"
									size={20}
									color="#fff"
									style={{ marginLeft: 8 }}
								/>
							</TouchableOpacity>
						</View>
					</View>
				</>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#050505',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 16,
		backgroundColor: 'rgba(5, 5, 5, 0.8)',
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(255, 255, 255, 0.05)',
		zIndex: 10,
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: '700',
		color: '#fff',
		letterSpacing: -0.5,
	},
	clearBtn: {
		fontSize: 14,
		fontWeight: '600',
		color: 'rgba(255, 255, 255, 0.6)',
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20,
	},
	emptyText: {
		fontSize: 18,
		fontWeight: '600',
		color: 'rgba(255, 255, 255, 0.6)',
		marginTop: 16,
		marginBottom: 24,
	},
	browseBtn: {
		backgroundColor: '#2b6cee',
		paddingHorizontal: 32,
		paddingVertical: 14,
		borderRadius: 24,
	},
	browseBtnText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '700',
	},
	scrollContent: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		paddingBottom: 300,
	},
	cartItemCard: {
		backgroundColor: 'rgba(20, 20, 23, 0.5)',
		borderRadius: 24,
		padding: 16,
		marginBottom: 16,
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.08)',
		overflow: 'hidden',
		position: 'relative',
	},
	gradientBlob: {
		position: 'absolute',
		width: 120,
		height: 120,
		borderRadius: 60,
		backgroundColor: 'rgba(43, 108, 238, 0.1)',
		zIndex: 0,
	},
	itemContent: {
		flexDirection: 'row',
		gap: 12,
		position: 'relative',
		zIndex: 1,
	},
	imageContainer: {
		width: 100,
		height: 100,
		borderRadius: 16,
		backgroundColor: 'rgba(255, 255, 255, 0.05)',
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.08)',
		overflow: 'hidden',
	},
	itemImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
	itemDetails: {
		flex: 1,
		justifyContent: 'space-between',
		paddingVertical: 4,
	},
	itemName: {
		fontSize: 15,
		fontWeight: '600',
		color: '#fff',
		lineHeight: 20,
	},
	itemColor: {
		fontSize: 12,
		fontWeight: '500',
		color: 'rgba(255, 255, 255, 0.5)',
		marginTop: 4,
	},
	itemFooter: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		gap: 8,
	},
	itemPrice: {
		fontSize: 16,
		fontWeight: '700',
		color: '#2b6cee',
	},
	quantityControl: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		backgroundColor: 'rgba(255, 255, 255, 0.05)',
		borderRadius: 20,
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.1)',
	},
	quantityBtn: {
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	quantityBtnActive: {
		backgroundColor: '#2b6cee',
	},
	quantityText: {
		fontSize: 12,
		fontWeight: '600',
		color: '#fff',
		minWidth: 20,
		textAlign: 'center',
	},
	removeBtn: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: 'rgba(255, 255, 255, 0.05)',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.08)',
	},
	summarySection: {
		position: 'absolute',
		bottom: 95,
		left: 0,
		right: 0,
		zIndex: 20,
	},
	gradientFade: {
		height: 40,
		backgroundColor: 'transparent',
	},
	summaryCard: {
		marginHorizontal: 16,
		marginBottom: 16,
		padding: 20,
		borderRadius: 28,
		backgroundColor: 'rgba(10, 10, 12, 0.8)',
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.1)',
	},
	pricingDetails: {
		marginBottom: 20,
		gap: 12,
	},
	pricingRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	pricingLabel: {
		fontSize: 13,
		fontWeight: '500',
		color: 'rgba(255, 255, 255, 0.6)',
	},
	pricingValue: {
		fontSize: 13,
		fontWeight: '600',
		color: '#fff',
		letterSpacing: 0.5,
	},
	divider: {
		height: 1,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		marginVertical: 8,
	},
	totalRow: {
		marginTop: 8,
	},
	totalLabel: {
		fontSize: 16,
		fontWeight: '700',
		color: '#fff',
	},
	totalPrice: {
		fontSize: 24,
		fontWeight: '900',
		color: '#2b6cee',
	},
	checkoutBtn: {
		backgroundColor: '#2b6cee',
		borderRadius: 28,
		paddingVertical: 16,
		paddingHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	checkoutBtnText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '700',
		letterSpacing: 0.5,
	},
});
