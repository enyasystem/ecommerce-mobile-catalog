import React, { useMemo } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Image,
	Dimensions,
	FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import {
	removeFavorite,
	clearFavorites,
	selectFavoritedCount,
} from '../features/favorites/favoritesSlice';
import { addToCart } from '../features/cart/cartSlice';

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 16;

export default function SavedScreen() {
	const router = useRouter();
	const dispatch = useDispatch();
	const favItems = useSelector((state: any) => state.favorites.items);
	const favCount = useSelector(selectFavoritedCount);

	const handleMoveToCart = (item: any) => {
		// Add to cart
		dispatch(
			addToCart({
				id: item.id,
				name: item.name,
				price: item.price,
				image: item.image,
			})
		);
		// Remove from favorites
		dispatch(removeFavorite(item.id));
	};

	const handleClearAll = () => {
		dispatch(clearFavorites(undefined));
	};

	const renderProductCard = ({ item }: any) => (
		<TouchableOpacity
			style={[styles.productCard, { width: cardWidth }]}
			activeOpacity={0.8}
			onPress={() =>
				router.push({
					pathname: '/product/[id]',
					params: {
						id: item.id,
						name: item.name,
						price: item.price,
						image: item.image,
						description: item.description || '',
					},
				})
			}
		>
			{/* Mesh Gradient Background */}
			<View style={styles.meshGradient} />

			{/* Heart Button */}
			<TouchableOpacity
				style={styles.heartButton}
				onPress={() => dispatch(removeFavorite(item.id))}
				activeOpacity={0.6}
			>
				<MaterialCommunityIcons
					name="heart"
					size={20}
					color="#2b6cee"
				/>
			</TouchableOpacity>

			{/* Product Image */}
			<View style={styles.imageContainer}>
				<Image source={{ uri: item.image }} style={styles.productImage} />
			</View>

			{/* Product Info */}
			<View style={styles.infoContainer}>
				<Text style={styles.category}>{item.category || 'Product'}</Text>
				<Text style={styles.productName} numberOfLines={1}>
					{item.name}
				</Text>
				<Text style={styles.price}>${item.price}</Text>
			</View>

			{/* Move to Cart Button */}
			<TouchableOpacity
				style={styles.moveToCartButton}
				onPress={() => handleMoveToCart(item)}
				activeOpacity={0.7}
			>
				<MaterialCommunityIcons
					name="shopping"
					size={14}
					color="#fff"
				/>
				<Text style={styles.moveToCartText}>Move to Cart</Text>
			</TouchableOpacity>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={styles.container}>
			{/* Sticky Header */}
			<BlurView intensity={80} style={styles.headerBlur}>
				<View style={styles.header}>
					<Text style={styles.title}>Wishlist</Text>
					{favCount > 0 && (
						<TouchableOpacity
							onPress={handleClearAll}
							activeOpacity={0.6}
						>
							<Text style={styles.clearAllButton}>Clear All</Text>
						</TouchableOpacity>
					)}
				</View>
			</BlurView>

			{/* Product Grid */}
			{favCount > 0 ? (
				<FlatList
					data={favItems}
					renderItem={renderProductCard}
					keyExtractor={(item) => item.id}
					numColumns={2}
					columnWrapperStyle={styles.gridContainer}
					contentContainerStyle={styles.listContent}
					scrollIndicatorInsets={{ right: 1 }}
					showsVerticalScrollIndicator={false}
				/>
			) : (
				<ScrollView
					contentContainerStyle={styles.emptyStateContainer}
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.emptyStateContent}>
						<MaterialCommunityIcons
							name="heart-outline"
							size={64}
							color="#2b6cee"
							style={{ opacity: 0.5 }}
						/>
						<Text style={styles.emptyStateTitle}>No Favorites Yet</Text>
						<Text style={styles.emptyStateMessage}>
							Start exploring and save items to your wishlist
						</Text>
						<TouchableOpacity
							style={styles.browseButton}
							onPress={() => router.push('/browse')}
							activeOpacity={0.7}
						>
							<Text style={styles.browseButtonText}>Browse Products</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#050505',
	},
	headerBlur: {
		borderBottomWidth: 0.5,
		borderBottomColor: 'rgba(255, 255, 255, 0.1)',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	title: {
		fontSize: 28,
		fontWeight: '700',
		color: '#fff',
		letterSpacing: 0.5,
	},
	clearAllButton: {
		fontSize: 14,
		fontWeight: '600',
		color: '#2b6cee',
		paddingVertical: 8,
		paddingHorizontal: 12,
	},
	gridContainer: {
		justifyContent: 'space-between',
		paddingHorizontal: 8,
		marginBottom: 8,
	},
	listContent: {
		paddingHorizontal: 8,
		paddingTop: 8,
		paddingBottom: 100,
	},
	productCard: {
		borderRadius: 32,
		padding: 12,
		marginHorizontal: 4,
		marginBottom: 8,
		overflow: 'hidden',
		backgroundColor: '#1a1a2e',
		borderWidth: 0.5,
		borderColor: 'rgba(255, 255, 255, 0.08)',
	},
	meshGradient: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(43, 108, 238, 0.05)',
		pointerEvents: 'none',
	},
	heartButton: {
		position: 'absolute',
		top: 12,
		right: 12,
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 10,
	},
	imageContainer: {
		width: '100%',
		aspectRatio: 1,
		borderRadius: 24,
		overflow: 'hidden',
		marginBottom: 12,
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		borderWidth: 0.5,
		borderColor: 'rgba(255, 255, 255, 0.1)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	productImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
	},
	infoContainer: {
		paddingHorizontal: 4,
		marginBottom: 12,
	},
	category: {
		fontSize: 11,
		fontWeight: '600',
		color: '#888',
		textTransform: 'uppercase',
		letterSpacing: 1,
		marginBottom: 4,
	},
	productName: {
		fontSize: 16,
		fontWeight: '700',
		color: '#fff',
		marginBottom: 4,
	},
	price: {
		fontSize: 14,
		fontWeight: '600',
		color: '#2b6cee',
	},
	moveToCartButton: {
		width: '100%',
		paddingVertical: 10,
		borderRadius: 20,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.15)',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 6,
	},
	moveToCartText: {
		fontSize: 11,
		fontWeight: '700',
		color: '#fff',
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
	emptyStateContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 40,
	},
	emptyStateContent: {
		alignItems: 'center',
		gap: 16,
	},
	emptyStateTitle: {
		fontSize: 24,
		fontWeight: '700',
		color: '#fff',
		textAlign: 'center',
	},
	emptyStateMessage: {
		fontSize: 14,
		color: '#aaa',
		textAlign: 'center',
		lineHeight: 20,
	},
	browseButton: {
		marginTop: 12,
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 20,
		backgroundColor: '#2b6cee',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	browseButtonText: {
		fontSize: 14,
		fontWeight: '700',
		color: '#fff',
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
});

